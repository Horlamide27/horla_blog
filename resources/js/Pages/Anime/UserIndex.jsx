import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";

export default function UserIndex({auth, animes}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6  py-4">

                        <div className="mt-10">
                            <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                                Your Animes
                            </h1>
                            <div className=''>
                                {animes.length === 0 && <>
                                    <p className='mb-10'>You have no animes yet</p>
                                    <Link href={ route('animes.create')} className="mt-10 btn btn-primary btn-lg bg-indigo-50 p-2 rounded"
                                    >
                                        Create One
                                    </Link>
                                </>
                                }
                            </div>
                            <div className="mt-6 grid gap-6 mb-10 md:grid-cols-2 xl:grid-cols-3">

                                {animes.map((anime) => (
                                    <div key={anime.id} className="flex flex-col col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                        <div className="flex-1 flex flex-col p-8">
                                            <h3 className="mt-6 text-gray-900 text-lg font-medium"><Link href={route("animes.show", anime.id)}>
                                                {anime.title}
                                            </Link></h3>
                                            <dl className="mt-1 flex-grow flex flex-col justify-between">
                                                <img src={route("images.image", {picture: anime.cover.path})} alt={anime.title}/>
                                            </dl>
                                        </div>
                                        </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
