
export class Converter {

    /**
     * 
     * @param price 
     */
    public static convertToNumber(price: string): number {
        return Number(price.split('$')[1]);
    }
}