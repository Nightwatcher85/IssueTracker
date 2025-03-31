'use client';

import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import { useForm, Controller, Form } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { Label } from '@radix-ui/react-label';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationsSchemas';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;
/*interface IssueForm{
  title: string;
  description: string;
}*/

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState:{ errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)});
  const [error,setError] = useState('');

  return (
    <div  className='max-w-xl space-y-3' >
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
  
      onSubmit={
        handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError('An unexpected error occured.')
        }
      })}>

      <div>
        <Label htmlFor="title">Title</Label>
        <input 
          id="title"
          {...register('title')}
          placeholder="Enter title"
          className="border border-gray-300 rounded p-2 w-full mb-5" />
          {errors.title && <Text color="red" as='p'>{errors.title.message}</Text>}
       
      </div>

        <Controller
          name = 'description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder = 'Description'  {...field} />}
          />
          {errors.description && <Text color="red" as='p'>{errors.description.message}</Text>}
        <Button type="submit">Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage