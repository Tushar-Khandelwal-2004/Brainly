
import './App.css'
import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'

function App() {
  return (
    <div>
      <Button startIcon={<PlusIcon/>} size="md" text='hello' varient='primary'/>
    <br />
    <br />
      <Button size='lg' text='hello' varient='secondary'/>
    </div>
  )
}

export default App
