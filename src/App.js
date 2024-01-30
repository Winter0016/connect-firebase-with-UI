
import './App.css';
import { Auth } from './components/auth';
import {db,auth,storage} from './config/firebase-config.js';
import {getDocs,collection,addDoc,deleteDoc, doc ,updateDoc} from 'firebase/firestore'

import {ref,uploadBytes} from "firebase/storage";

import {useState,useEffect} from 'react';
function App() {
  const [productlist,setproductlist] = useState([]);
  const productcollectionref = collection(db, "products")

  const [newproductname,setnewproductname ] = useState("");
  const [newprice,setnewprice ] = useState(0);
  const [newavailble,setnewavailble ] = useState(false);
  const[updatename,setupdatename] =useState("");

  //file upload state

  const [fileupload,setfileupload] = useState(null)

  useEffect( () => {
    const Getproductlist = async() => {
      //read the data
      //set the product list
      try{
        const data = await getDocs(productcollectionref);
        const filterdata = data.docs.map((doc) => ({
          ...doc.data(),id: doc.id,
        }));
        //console.log(filterdata);
        setproductlist(filterdata);
      }catch(err){
        console.error(err);
      }
    };
    Getproductlist();
  },[productlist])

  /*
  useEffect( () =>{
    console.log(`new avaible : ${newavailble}`);
  },[newavailble])
  */

  const onsubmitproduct = async() =>{
    try{
      await addDoc(productcollectionref,{
        name : newproductname ,
        price : newprice,
        avaible : newavailble,
        userId: auth?.currentUser?.uid,
      });
    }catch(err){
      console.error(err);
    }
  };

  const deleteproduct = async(id) =>{
    try{
      const productDoc = doc(db,"products",id);
      await deleteDoc(productDoc);
    }catch(err){
      console.error(err);
    }
  };

  const updateproductname = async(id) =>{
    try{
      const productDoc = doc(db,"products",id);
      await updateDoc(productDoc,{name : updatename});
    }catch(err){
      console.error(err);
    }
  };

  const uploadfiles = async() => {
    if(!fileupload) return;
    console.log(`fileupload ${fileupload.name}`);
    const filesfolderRef = ref(storage, `projectFiles/${fileupload.name}`);
    try{
      await uploadBytes(filesfolderRef,fileupload);    
    }catch (err){
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth/>
      <div>
        <input placeholder='product name...' 
          onChange={(e) => setnewproductname(e.target.value)}
        />
        <input placeholder='product price...' type='number' 
            onChange={(e) => setnewprice(e.target.value)}
        />
        <input type='checkbox'
          checked = {newavailble}
          onChange={(e) => {
            setnewavailble(e.target.checked);
          }}
        />
        <label>Availble</label>
        <button type='submit' onClick={() => onsubmitproduct()}> submit product </button>
      </div>

      <div>
        {productlist.map( (product) =>(
          <div>
            <h1 style={{color : product.avaible ? "green" : "red", }}>{product.name}</h1>
            <p>price :{product.price}</p>
            <input type="text" 
              placeholder='change name'
              onChange={(e) => setupdatename(e.target.value)}
            />
            <button onClick={ () => updateproductname(product.id) }>Update name</button><br/>
            <button onClick={ () => deleteproduct(product.id) }> Delete product </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" 
          onChange={(e) => setfileupload(e.target.files[0])}
        />
        <button onClick={uploadfiles}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
