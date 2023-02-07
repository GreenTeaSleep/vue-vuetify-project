import tambons from "@/assets/api_tambon.json"
import amphure from "@/assets/api_amphure.json"

const getAmphure = () => {

    const arr: { id: number; name_th: string }[] = []
    amphure.filter(
        (item) => {
            if (item.province_id == 70 && item.name_th != "ท้องถิ่นเทศบาลตำบลสำนักขาม") {
                arr.push({
                    id: item.id,
                    name_th: item.name_th,
                })
            }

        }
    )

    return arr
}

const getTambons = (amphure_id: number) => {

    const arr: { id: number; nameTAM: string }[] = []
    tambons.filter((item) => {
        if (item.amphure_id == amphure_id) {
            arr.push({
                id: item.id,
                nameTAM: item.name_th
            })
        }
    })

    return arr
}

export {
    getAmphure,
    getTambons
}