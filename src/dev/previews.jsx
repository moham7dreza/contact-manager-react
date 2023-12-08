import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Users} from "../components/users/Users";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Users">
                <Users/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews