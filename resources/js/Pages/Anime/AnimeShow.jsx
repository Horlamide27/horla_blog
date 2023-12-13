import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

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
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                    {anime.title}
                </h1>
                {isAuthor || isAdmin ? <div className="flex mt-10">
                        <div className="flex space-x-6 items-center">
                            <div className="text-sm">
                                <p>
                                    <PrimaryButton>
                                        <Link href={route('animes.edit', {id: anime.id})}>
                                            Edit Details
                                        </Link>
                                    </PrimaryButton>
                                </p>

                            </div>
                            <div className="text-sm">
                                <p>
                                    <PrimaryButton type="button"
                                                     onClick={() => deleteAnime(route('animes.destroy', {id: anime.id}))}>
                                        Delete Anime
                                    </PrimaryButton>
                                </p>

                            </div>
                        </div>
                    </div>
                    : null
                }
                <div className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <div>
                        <img src={route("images.image", {picture: anime.cover.path})} alt={anime.title}/>
                    </div>
                    <div>
                        <p>{anime.about}</p>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}
