import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Link, useForm} from "@inertiajs/react";
import TextArea from "@/Components/TextArea.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";
import Guest from "@/Layouts/GuestLayout.jsx";

export default function ShowPost({auth, post, author}){
    const isAuthor = auth?.user?.id === post?.user_id;
    const isAdmin = auth?.user?.role === 'MANAGER' || auth?.user?.role === 'ADMIN';
    const {setData, post:postComment, delete:deleteFn, errors } = useForm({
        content: '',
    });
    const { delete:deleteFnPost} = useForm({});
    const submit = (e) => {
        e.preventDefault();
        postComment(route('posts.comment.store', {id: post.id}));
    }
    const deleteComment = (e, comment_id) => {
        e.preventDefault();
        deleteFn(route('posts.comment.destroy', {id:post.id, comment_id}));
    }
    const deletePost = (e) => {
        e.preventDefault();
        deleteFnPost(route('posts.destroy', {id:post.id}));
    }
    const Content = () => {
        return <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <div className='flex items-center justify-between my-10 mb-20'>
                    <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                        {post.title}
                    </h1>
                    <p className='text-gray-600 text-sm'>
                        Posted in
                        <span className='font-bold underline'>
                                {' '}
                            <Link href={route('animes.show', {id: post.anime.id})}>
                                    {post.anime.title}
                                </Link>
                            {'  '}
                            </span>

                        by {author}
                    </p>
                    { (isAuthor || isAdmin) &&
                        <PrimaryButton onClick={(e) => deletePost(e)}>
                            <p className=' text-sm'>
                                Delete
                            </p>
                        </PrimaryButton>
                    }

                </div>
                <div>
                    <p className="">
                        {post.body}
                    </p>
                </div>
                <div className='flex flex-col justify-between my-10'>
                    <div className='flex items-center space-x-10'>
                        <h1 className="text-center text-md font-bold text-blue-600 sm:text-lg">
                            Comments
                        </h1>
                        <p className='text-gray-600 text-sm'>
                            {post?.comments.length} comments
                        </p>
                    </div>

                    {post?.comments?.map((comment,i) => (
                        <div className='flex items-center justify-between my-10' key={i}>
                            <div className='flex flex-col justify-between space-y-2'>
                                <div className='flex space-x-6'>
                                    <p className='underline text-gray-700'>
                                        <Link href={route('posts.user-index', {id: comment.user.id})}>
                                            {comment.user.name}
                                        </Link>
                                    </p>
                                    { (isAuthor || isAdmin || auth?.user?.id === comment?.user?.id )&&
                                        <PrimaryButton onClick={(e) => deleteComment(e, comment.id)}>
                                        <p className=' text-sm'>
                                            Delete
                                        </p>
                                    </PrimaryButton>}
                                </div>
                                <p className=' text-md'>
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))}
                    <form className='mt-10 w-full' onSubmit={(e)=>submit(e)}>
                        <TextArea className='w-full'
                                  onChange={(e) => setData('content', e.target.value)}
                        />
                        <InputError message={errors.content} className="mt-2"/>
                        <PrimaryButton className='mt-4' >
                            Post Comment
                        </PrimaryButton>

                    </form>
                </div>
            </div>
        </div>
    }
    return (
         auth?.user ?
    <AuthenticatedLayout user={auth?.user}>
        {Content()}
    </AuthenticatedLayout>
            : <Guest>
                 {Content()}
            </Guest>

    )
}
