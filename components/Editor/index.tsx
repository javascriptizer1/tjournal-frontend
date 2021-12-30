import React, {FC, useEffect} from 'react';
import EditorJS, {OutputData} from "@editorjs/editorjs";


interface EditorProps {
    onChange: (blocks: OutputData['blocks']) => void;
    initialBody?: OutputData['blocks'];
}

export const Editor: FC<EditorProps> = ({onChange, initialBody}) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            async onChange() {
                const {blocks} = await editor.save();
                onChange(blocks);
            },
            data: {
                blocks: initialBody!
            },
        });
        return () => {
            editor.isReady.then(() => {
                editor.destroy();
            })
        }
    }, [])
    return (
        <div id='editorjs'/>
    );
};