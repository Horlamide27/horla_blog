import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Banner from "@/Components/Banner.jsx";

export default function AnimeShow({auth, anime}) {
    const {delete: deleteAnime} = useForm({});
    const isAuthor = auth.user.id === anime.user_id;
    const isAdmin = auth.user.role === 'MANAGER' || auth.user.role === 'ADMIN';
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <Banner title={anime.title} about={anime.about}
                    canEdit={isAuthor || isAdmin}
                    deleteFn={()=>deleteAnime( route('animes.destroy', anime.id)  ) }
                    editLink={route('animes.edit', {id: anime.id})}
                    image={route("images.image", {picture: anime.cover.path})}
                    genres={anime.genres}
            />
            <div className="flex space-x-8">
                <h1 className="text-3xl font-semibold text-gray-900 mt-12">Posts</h1>
                <Link href={route('posts.create', {anime_id: anime.id})}>
                    <PrimaryButton className="ml-auto mt-12">New Post</PrimaryButton>
                </Link>
            </div>
            <div className="mt-8">
                {anime?.posts?.map((post) => (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4" key={post.id}>
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                <Link href={route('posts.show', {id: post.id})}>
                                    {post.title}
                                </Link>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </AuthenticatedLayout>
    )
}
