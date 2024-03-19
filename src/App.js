import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRef, useState } from 'react';
import './app.css'

function App() {
const [nameError, setNameError] = useState('')
const [emailError, setEmailError] = useState('')
const [phoneNumberError, setPhoneNumberError] = useState('')
const [departmentError, setDepartmentError] = useState('')
const [tableDatas, setTableDatas] = useState([])
const [readData, setReadData] = useState([])
const [showblock, setshowblock] = useState(false)
const [values, setValues] = useState({
  fullname: '',
  phoneNumber: '',
  email: '',
  department: '',
  id: '',
})
const [editValues, setEditValues] = useState([])
const [editToggle, setEditToggle] = useState(false)

const inputRef = useRef()
function handleInput(event) {
  const newObj = {...values, 
      [event.target.name]: event.target.value,
    }
    setValues(newObj)
}
 
function handleSubmit(e) {
  e.preventDefault()
  if(validateInput()){
    values.id = new Date().getTime().toString()
    displayTable(values)
    e.target.reset();
    setValues('')
    setEditToggle(false)
  }

function validateInput(){
  let success = true

  if(values.fullname === ''){
      setNameError('*Full name is required')
      success = false
    } else  {
      setNameError('')
    } 
  
  if(values.phoneNumber === ''){
    setPhoneNumberError('*Phone Number is required')
    success = false
  } else if(values.phoneNumber === '' || !/^\d{10}$/.test(values.phoneNumber)) {
    setPhoneNumberError('*Invalid Phone Number')
    success = false
  } else {
    setPhoneNumberError('')
  }

  if(values.email === ''){
    setEmailError('*Email is required')
    success = false
  } else if(values.email === '' || !/\S+@\S+\.\S+/.test(values.email)){
    setEmailError('*Invalid Email')
    success = false
  } else {
    setEmailError('')
  }

  if(values.department === ''){
    setDepartmentError('*Select Deapartment')
    success = false
  } else {
    setDepartmentError('')
  }
  
  return success
  }
}

function displayTable(values){
  if(editToggle === true){
    console.log('Aashiq')
    setTableDatas(tableDatas.map((currElem) => {
      if(currElem.id === editValues){
        return {...currElem,  fullname: values.fullname,
                              phoneNumber: values.phoneNumber,
                              email: values.email,
                              department: values.department,
                              id: values.id, }
      } else {
        return currElem
      }
    }))
    setEditToggle(false)
  } else {
    setTableDatas([...tableDatas, values])
}
}


function editData(id){
  const editValues = tableDatas.find((data) => {
    return data.id === id
  }) 
  setValues({
    fullname: editValues.fullname,
    phoneNumber: editValues.phoneNumber,
    email: editValues.email,
    department: editValues.department,
    id: editValues.id,
  })
  setEditValues(id)
  setEditToggle(true)
}

function deleteData(id){
  const updateitems = tableDatas.filter((curElem) => {
    return curElem.id !== id
  })
  setTableDatas(updateitems)
}

function showData(id){
  setshowblock(true)
  const selectedData = tableDatas.find((currElem) => {
    return currElem.id === id
  })
  setReadData(selectedData)
  console.log(readData)
}

function back(){
  setshowblock(false)
}

  return (
    <>
      <div className='container'>
        <form className='form-block' onSubmit={handleSubmit} ref={inputRef} >
          <h1>Enter the Student details</h1>
          <div className='input-container'>
            <div className='input-block'>
              <h3>Full Name with initials</h3>
              <input type='text' name='fullname' value={values.fullname} onChange={handleInput} />
              <p>{nameError}</p>
            </div>
            <div className='input-block'>
              <h3>Phone number</h3>
              <input type='text' name='phoneNumber' value={values.phoneNumber} onChange={handleInput}/>
              <p>{phoneNumberError}</p>
            </div>
            <div className='input-block'>
              <h3>Email</h3>
              <input type='text' name='email' value={values.email} onChange={handleInput}/>
              <p>{emailError}</p>
            </div>
            <div className='input-block'>
              <h3>Department</h3>
              <select name='department' value={values.department} onChange={handleInput}>
                <option value='' disabled>Select departement</option>
                <option value='BCA'>BCA</option>
                <option value='B.Com'>B.Com</option>
                <option value='B.Sc'>B.Sc</option>
                <option value='BBA'>BBA</option>
                <option value='MBA'>MBA</option>
              </select>
              <p>{departmentError}</p>
            </div>
          </div>
          <div className='submit-block'>
            <center>
              {editToggle ? <input type='submit' value='Update'/> : <input type='submit' value='Add'/>}
               
            </center>
          </div>
        </form>

        <div className='table-container'>
          <table>
          <caption>Student List</caption>
            <tr className='table-header'>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Departments</th>
              <th></th>
            </tr>
            {tableDatas.map((data) => (
              <tr className='table-datas' key={data.id}>
                <td>{data.fullname}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.email}</td>
                <td>{data.department}</td>
                <td className='operator-container'>
                <div className='operator' onClick={() => showData(data.id)} ><VisibilityOutlinedIcon/></div>
                <div className='operator' onClick={() => editData(data.id)} ><EditOutlinedIcon/></div>
                <div className='operator' onClick={() => deleteData(data.id)}><DeleteOutlinedIcon/></div>
              </td>
            </tr>
            ))}
            
          </table>
          </div>
      </div>

      <div className={showblock ? 'show-container' : 'show-container-block'}>
        <div className='show-block'>
           <center>
              <table className='show-table'>
                <tr>
                  <td><div className='shown-data'>Name: </div></td>
                  <td><span>{readData.fullname}</span></td>
                </tr>
                <tr>
                  <td><div className='shown-data'>Phone Number: </div></td>
                  <td><span>{readData.phoneNumber}</span></td>
                </tr>
                <tr>
                  <td><div className='shown-data'>Email: </div></td>
                  <td><span>{readData.email}</span></td>
                </tr>
                <tr>
                  <td><div className='shown-data'>Departement: </div></td>
                  <td><span>{readData.department}</span></td>
                </tr>
              </table>
              </center>
              <center><div className='back-btn' onClick={back}>Back</div></center>
        </div>
    </div>
    </>
  );
}

export default App;
