import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
   const empdata=[
    {
        id : 1,
        name : "ahmed",
        age : 18,
        isActive : 1
    },
    {
        id : 2,
        name : "youssif",
        age : 15,
        isActive : 0
    },
    {
        id : 3,
        name : "fathy",
        age : 23,
        isActive : 1
    },
   ] 
   useEffect(()=>{
    getData()
   },[])
   const[name,setName] =useState('');
   const[age,setAge] =useState('');
   const[isActive,setIsActive] =useState(0);
   const[editId,setEditId]=useState('');
   const[editName,setEditName] =useState('');
   const[editAge,setEditAge] =useState('');
   const[editIsActive,setEditIsActive] =useState(0);


      const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [data ,setData]= useState([]);
   

   const handleEdit=(id)=>{
      handleShow();
      axios.get(`https://localhost:7055/api/Employee/${id}`).then((result)=>{
     
        setEditName(result.data.name),
        setEditAge(result.data.age),
        setEditIsActive(result.data.isActive),
        setEditId(id)
       
    }).catch((error)=>{
       
    })
    }
    const handleDelate=(id)=>{
       if (window.confirm("Are you sure that you want to delete !!") == true){
        axios.delete(`https://localhost:7055/api/Employee/${id}`).then((result)=>{
            if (result.status === 200){
                getData();
                toast.success('Employee is deleted')
            }
        })
       }
     }
    const handleUpdate=()=>{
        const url =`https://localhost:7055/api/Employee/${editId}`;
        const data ={
            "id" : editId,
            "name" :editName,
            "age" : editAge,
            "isActive": editIsActive
        }
        axios.put(url,data).then((result)=>{
            handleClose();
            getData();
           
            
            toast.success('Employee has been updated');
            clear();
        })
    }
    const getData=()=>{
        axios.get('https://localhost:7055/api/Employee').then((result)=>{
            setData(result.data)
            console.log(result);
        }).catch((error)=>{
            console.log(error); 
        })
    }
    const handleSave =()=>{
        const url ='https://localhost:7055/api/Employee';
        const data ={
            "name" :name,
            "age" : age,
            "isActive": isActive
        }
        axios.post(url,data).then((result)=>{
            getData();
            clear();
            toast.success('Employee has been added')
        })
        const clear =() =>{
            setName('');
            setAge("");
            setIsActive(0);
            setEditName('');
            setEditAge('');
            setEditIsActive('');

        }
    }
    const handleActiveChange =(e) =>{
        if (e.target.checked){
            setIsActive(1)
        }else{
            setIsActive(0)
        }
    }
    const handleEditActiveChange =(e) =>{
        if (e.target.checked){
            setEditIsActive(1)
        }else{
            setEditIsActive(0)
        }
    }
  return (<>
  <ToastContainer></ToastContainer>
  &nbsp;
   <Container>
      
      <Row>
        <Col><input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} /></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Age" value={age} onChange={(e)=> setAge(e.target.value)}/></Col>
        <Col><input type="checkbox" checked={isActive === 1 ? true :  false}
         onChange={(e)=>handleActiveChange(e)}
         value={isActive}/>
        <label>Is Active</label>
        </Col>
        <Col><button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button></Col>
       
       
      </Row>
      &nbsp;
    </Container>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Is Active</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length == 0 ?
            "No Records Yet ":
            data && data.length > 0?
            data.map((item,index)=>{
                return(<tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                        <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>handleDelate(item.id)}>Delete</button>
                    </td>
                  </tr>)
            }) 
            :
            'loading...'

        }
        
        
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body><Row>
        <Col><input type="text" className="form-control" placeholder="Enter Name" value={editName} onChange={(e)=> setEditName(e.target.value)} /></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Age" value={editAge} onChange={(e)=> setEditAge(e.target.value)}/></Col>
        <Col><input type="checkbox" checked={editIsActive === 1 ? true: false}
         onChange={(e)=>handleEditActiveChange(e)}
         value={isActive}/>
        <label>Is Active</label>
        </Col>
       
       
       
      </Row></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </>);
  
};
export default CRUD;
