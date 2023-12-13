import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link} from "@inertiajs/react";
import Genre from "@/Pages/Anime/Genre.jsx";
export default function Banner({title, image, editLink, deleteFn, canEdit, ...props}){
    return (
        <section
            style={{ backgroundImage: `url(${image})`}}
            className={`bg-center bg-no-repeat bg-gray-700 bg-blend-multiply`}>
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    {title}</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{props?.about}</p>
                <div className="flex items-center justify-center my-10 space-x-4 text-md">
                    {props?.genres?.map((genre, i) => (
                        <Genre title={genre.name} key={i}/>
                    )) }
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <div className="flex space-x-6 items-center">
                        {canEdit &&
                           <>
                               <div className="text-sm">
                                   <p>
                                       <PrimaryButton>
                                           <Link href={editLink}>
                                               Edit Details
                                           </Link>
                                       </PrimaryButton>
                                   </p>
                               </div>
                               <div className="text-sm">
                                   <p>
                                       <PrimaryButton type="button"
                                                      onClick={deleteFn}>
                                           Delete Discussion
                                       </PrimaryButton>
                                   </p>
                               </div>
                           </>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
