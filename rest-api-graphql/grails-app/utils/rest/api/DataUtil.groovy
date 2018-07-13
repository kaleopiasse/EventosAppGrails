package rest.api

@Singleton
class DataUtil {

    long getLong (value) throws IllegalArgumentException {
        try {
            return value as Long

        } catch (NumberFormatException | NullPointerException e) {
            throw new IllegalArgumentException('input.id.invalid')
        }
    }

    double getDouble (value) throws IllegalArgumentException {
        try {
            return value as Double

        } catch (NumberFormatException | NullPointerException e) {
            throw new IllegalArgumentException('input.id.invalid')
        }
    }

    int getInteger (value) throws IllegalArgumentException {
        try {
            return value as Integer

        } catch (NumberFormatException | NullPointerException e) {
            throw new IllegalArgumentException('input.id.invalid')
        }
    }

    boolean getBoolean (value) throws IllegalArgumentException {
        try {
            if (value instanceof String) {
                return Boolean.parseBoolean(value)
            }

            return value as Boolean

        } catch (NumberFormatException | NullPointerException e) {
            throw new IllegalArgumentException('input.id.invalid')
        }
    }
}
