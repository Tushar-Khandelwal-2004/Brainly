
import './App.css'
import Card from './components/Card'
import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

function App() {
  return (
    <div className='flex gap-4'>

      <Card title="Ochi bolte" type="twitter" link='https://x.com/Beluga_69_69/status/1883555882447090143'/>
      <Card title="Ochi bolte" type="youtube" link='https://www.youtube.com/watch?v=DW8QbuYSlHw'/>
      {/* <Button startIcon={<ShareIcon size="sm"/>} size="sm" text='Add Content' varient='primary' />

      <Button startIcon={<PlusIcon size="md"/>} size='sm' text='Share Brain' varient='secondary'/> */}
    </div>
  )
}

export default App
