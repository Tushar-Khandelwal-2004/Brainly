
import './App.css'
import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'

function App() {
  return (
    <div>
      <Button startIcon={<PlusIcon size="sm"/>} size="sm" text='hello' varient='primary'/>
    <br />
    <br />
      <Button startIcon={<PlusIcon size="lg"/>} size='lg' text='hello' varient='secondary'/>
    </div>
  )
}

export default App
