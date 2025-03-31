'use client';

import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller, Form } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { Label } from '@radix-ui/react-label';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// Dynamically import SimpleMDE to prevent SSR errors
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm{
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <form 
      className='max-w-xl space-y-3' 
      onSubmit={
        handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}>

      <div>
        <Label htmlFor="title">Title</Label>
        <input 
          id="title"
          {...register('title')}
          placeholder="Enter title"
          className="border border-gray-300 rounded p-2 w-full" // Add your preferred styling
        />
      </div>

        <Controller
          name = 'description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder = 'Description'  {...field} />}
          />
        <Button type="submit">Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage