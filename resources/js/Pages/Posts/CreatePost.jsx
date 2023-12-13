import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextArea from "@/Components/TextArea.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useForm} from "@inertiajs/react";

export default function CreatePost({auth}) {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        body: '',
        anime_id: new URLSearchParams(window.location.search).get('anime_id'),
    });
    const submit = (e) => {
        e.preventDefault();
        post( route('posts.store'));
    }
    return (
        <Authenticated user={auth.user}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                        Make a New Post
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
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2"/>
                        </div>

                        <div>
                            <InputLabel htmlFor="body" value="Body"/>
                            <TextArea
                                id="body"
                                className="mt-1 block w-full"
                                defaultValue={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                autoComplete="text"
                            />

                            <InputError message={errors.body} className="mt-2"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Make Post</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    )
}
