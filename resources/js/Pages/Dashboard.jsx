import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import route from 'ziggy-js';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6  py-4">
                        <div className="text-gray-900 mb-6">You're logged in!</div>
                        {/*<Link href={ route('posts.create')} className="mt-10 btn btn-primary btn-lg bg-indigo-50 p-2 rounded"*/}
                        {/*>*/}
                        {/*    Make a Post*/}
                        {/*</Link>*/}
                        <Link href={ route('animes.user-index', auth.user.id)} className="mt-10 btn btn-primary btn-lg bg-indigo-50 p-2 rounded"
                        >
                            See your Discussions
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
