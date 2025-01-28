
import './App.css'
import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

function App() {
  return (
    <div className='pl-10'>
      <Button startIcon={<ShareIcon size="sm"/>} size="sm" text='Add Content' varient='primary' />

      <Button startIcon={<PlusIcon size="md"/>} size='sm' text='Share Brain' varient='secondary'/>
    </div>
  )
}

export default App
