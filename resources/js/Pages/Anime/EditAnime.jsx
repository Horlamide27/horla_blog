import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextArea from "@/Components/TextArea.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {useForm} from "@inertiajs/react";

export default function EditAnime({auth, anime}){
    const {data, setData, patch, processing, errors} = useForm({
        title: anime.title,
        about: anime.about,
        image: '',
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('animes.update', anime.id));
    }
   return <AuthenticatedLayout user={auth.user}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                    Edit Anime Details
                </h1>

                <form
                    onSubmit={(e) => submit(e)}
                    className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
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
                            Edit Anime
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
}
