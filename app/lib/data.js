import prisma from '@/lib/prisma.js'

export const getEvents = async () => {
    try {
        const events = await prisma.$transaction([
            prisma.Event.findMany({
                orderBy: {
                    date: 'asc'
                },
            })
        ])
        // console.log(events[0])
        return events[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch events")
    }
}

export const getMerchs = async () => {
    try {
        const merchs = await prisma.$transaction([
            prisma.Merch.findMany({
                where :{
                    isAvailable: true
                },
                orderBy: {
                    title: 'asc'
                },
            })
        ])
        // console.log(merchs[0])
        return merchs[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch merch")
    }
}