import {
    IMAGE_LOADER1_START,
    IMAGE_LOADER1_SUCCESS,
    IMAGE_LOADER2_START,
    IMAGE_LOADER2_SUCCESS
} from '../../constants/index'

export default function image(state ={}, action) {
    switch (action.type) {
        case IMAGE_LOADER1_START:
            return {
                ...state,
                loader: action.payload.loader
            }

        case IMAGE_LOADER1_SUCCESS:
            return {
                ...state,
                loader: action.payload.loader
            }

        case IMAGE_LOADER2_START:
            return {
                ...state,
                loader2: action.payload.loader2
            }

        case IMAGE_LOADER2_SUCCESS:
            return {
                ...state,
                loader2: action.payload.loader2
            }
            
        default:
            return state;
    }
}