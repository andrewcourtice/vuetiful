
export default function firstOf(array) {

    if (!array.length || array.length < 1) {
        return;
    }

    return array[0];

}