import { format } from "date-fns";

export default function datetime(value, pattern) {
    return format(value, pattern);
}