import EmbedClient from '@/components/EmbedClient';
import { getSession } from '@/lib/getUserSession'
import { Loader } from 'lucide-react';


const EmbedPage = async() => {

    const session = await getSession();

    if(!session?.user?.id){
        throw new Error('User is not authenticated')
    }

   
  return (
    <>
     <EmbedClient ownerId={session.user.id}/>
    </>
  )
}

export default EmbedPage
