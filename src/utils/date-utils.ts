
export class DateUtils {

    /**
     * 
     * @param date  tipo new Date()
     * @returns date in format dd month yyyy example: 05 jun 2024
     */
    public static formatDate(date: Date): string {
        const basicFormat = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
        const parts = basicFormat.split(/[\s,]+/);
        const [month, day, year] = parts;
        return `${day} ${month} ${year}`;

    }

    public static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}