import {useState} from "react";
import ReactPaginate from "react-paginate";
import {Link} from "@inertiajs/react";

export default function PaginatedContent({ content, header , children, ...props  }){
    const [itemOffset, setItemOffset] = useState(0);
    const perPage = 10;
    const slice = content.slice(itemOffset, itemOffset + perPage);
    const pageCount = Math.ceil(content.length / perPage);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setItemOffset(offset);
    }
    const Pagination = () => {
        return (
            <div className="flex flex-col">
                <div className="flex">
                    <h1 className="text-4xl font-bold text-gray-800">
                        {" "}
                        {header}
                    </h1>
                    <div className=" flex flex-wrap space-x-6 items-center w-9/12 mt-10">
                        {slice.map((item) => (
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4" key={item.id}>
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        <Link href={route('posts.show', {id: item.id})}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <Pagination/>
            <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                className={"flex justify-center items-center my-14"}
                pageClassName="p-2 bg-white border border-gray-300 shadow-sm text-sm font-medium hover:bg-gray-50"
                containerClassName={"flex justify-center items-center mt-10"}
            />
        </>
    )
}
