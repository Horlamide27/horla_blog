import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextArea from "@/Components/TextArea.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {useForm} from "@inertiajs/react";
import Genre from "@/Pages/Anime/Genre.jsx";

export default function CreateAnime({auth}) {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        about: '',
        image: '',
        genres: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('animes.store'));
    }
    const addGenre = (e) => {
        e.preventDefault();
        if (data.genres.length < 3) {
            !data.genres.includes(e.target.value) ? setData('genres', [...data.genres, e.target.value]) : null;
        } else alert("You can only add 3 genres");
    }
    const removeGenre = (genre) => {
        setData('genres', data.genres.filter((g) => g !== genre));
    }
    return (
        <Authenticated user={auth.user}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                        Make a New Anime Discussion
                    </h1>

                    <form
                        onSubmit={(e) => submit(e)}
                        className="mt-6 mb-0 space-y-4 rounded-lg bg-yellow-50 p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <div>
                            <InputLabel htmlFor="title" value="Title"/>

                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2"/>
                        </div>

                        <div>
                            <InputLabel htmlFor="about" value="About"/>
                            <TextArea
                                id="about"
                                className="mt-1 block w-full"
                                defaultValue={data.about}
                                onChange={(e) => setData('about', e.target.value)}
                            />

                            <InputError message={errors.about} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="genres" value="Genres"/>
                            <select onChange={(e) => addGenre(e)} className="my-4 mr-3">
                                <option disabled>Pick a genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                            </select>
                            {
                                [...data.genres].map((genre, id) => (
                                    <Genre key={id} title={genre} deleteGenre={() => removeGenre(genre)}/>
                                ))
                            }
                            <InputError message={errors.genres} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="image" value="Image"/>
                            <div className="w-full inline">
                                <div className="mb-12">
                                    <input
                                        type="file" name="image"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton
                                disabled={processing}
                                type="submit"
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
