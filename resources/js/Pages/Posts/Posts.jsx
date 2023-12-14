import PaginatedContent from "@/Components/PaginatedContent.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Posts({auth, posts, comments}){
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className='text-3xl font-bold'>Posts and Comments by {posts[0].user?.name}</h1>

                <PaginatedContent content={posts}/>
                <PaginatedContent content={comments}/>
            </div>
        </AuthenticatedLayout>
    )
}
