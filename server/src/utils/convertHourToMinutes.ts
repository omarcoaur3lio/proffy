export default function convertHourToMinutes(time: string) {
    /* 
    * Realiza a separação da hora recebida (através dos ":")
    * Converte os itens separados em Numéricos. Ex: hora passada = 8:00
    *  08:00 -> [8, 0]
    *  (8 * 60) + 0 = 480 minutos
    */
    const [ hour, minutes ] = time.split(":").map(Number);

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}