import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const PostsPage = () => {
  return (
    <div>
      <Button> <Link href='/posts/new'>New post </Link> </Button>
    </div>
  )
}

export default PostsPage;
