import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Link} from "@inertiajs/react";

export default function ShowPost({auth, post, author}){
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
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
                    </div>
                    <div>
                        <p className="">
                            {post.body}
                        </p>
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    )
}
