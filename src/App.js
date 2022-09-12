import {useState, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Spells from './components/Spells';
import Members from './components/Members';
import Home from './components/pages/Home';
import SpellView from './components/pages/SpellView';
import MemberView from './components/pages/MemberView';
import NavBar from './components/NavBar';
import Umbridge from './components/pages/Umbridge';
import NewMember from './components/pages/NewMember';
import NewSpell from './components/pages/NewSpell';
import MemberEdit from './components/pages/MemberEdit';
import SpellEdit from './components/pages/SpellEdit';
import userService from './utils/userService';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Meetings from './components/Meetings';
  

function App() {

const [spells, setSpells] = useState([])
const [members, setMembers] = useState([])

useEffect(() => {
  fetch('http://localhost:8000/spells')
  .then(res => res.json())
  .then( items => setSpells(items))
  // console.log(spells)
}, [])

useEffect(() => {
  fetch('http://localhost:8000/members')
  .then(res => res.json())
  .then( items => setMembers(items))
}, [])

// console.log(spells)
// console.log(members)

const addSpell = (spell) =>{
  setSpells([...spells, spell])
}

const addMember = (member) =>{
  setMembers([...members, member])
}

const updateMemberState = (id) => {
  setMembers(members.filter(member => member.id !== id))
}

const updateSpellState = (id) => {
  setSpells(spells.filter(spell => spell.id !== id))
}
const [user, setUser] = useState({});

const handleSignupOrLogin = () => {
  setUser(userService.getUser())
}

const handleLogout = () => {
  userService.logout();
  setUser(null)
}
// console.log(user)
  return (
    <div className="App">
      <nav>
        <NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
      </nav>
      {/* <h1>Dumbledore's Army</h1> */}

      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/spells' element= {<Spells spells = {spells} members= {members}/>} />
        <Route path='/members' element= {<Members spells = {spells} members= {members}/>} />
        <Route path='/meetings' element= {<Meetings/>} />
        <Route path='/new-member' element= {<NewMember addMember={addMember} />} />
        <Route path='/new-spell' element= {<NewSpell addSpell={addSpell} />} />
        <Route path='/umbridge' element={<Umbridge />} />
        {/* <Route path='/spells/edit/:id' element={<SpellEdit setSpells={setSpells}/>} /> */}
        <Route path='/members/edit/:id' element={<MemberEdit setMembers={setMembers}/>} />
        <Route path='/spells/:id' element={<SpellView spells={spells} updateSpellState = {updateSpellState} members={members}/> }  />
        <Route path='/members/:id' element={<MemberView members={members} updateMemberState={updateMemberState}/>} />
        <Route path='/members/:id' element={<MemberView members={members} updateMemberState={updateMemberState}/>} />
        <Route path='/signup' element={<SignUp handleSignupOrLogin={handleSignupOrLogin}/>} />
        <Route path='/login' element={<Login handleSignupOrLogin={handleSignupOrLogin} setUser={setUser} />} />
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </div>
  );
}

export default App;
