import prisma from '@/lib/prisma.js'

export const getAllMembers = async (q, page) => {
    const ITEMS_PER_PAGE = 2
    try {
        const [count, members] = await prisma.$transaction([
            prisma.Member.count(),
            prisma.Member.findMany({
                skip: (ITEMS_PER_PAGE * (page-1)),
                take: ITEMS_PER_PAGE,
                orderBy: {
                    profile: {
                        l_name: 'desc'
                    }
                },
                where: {
                    profile: {
                        OR: [
                            {
                                f_name: {
                                    contains: `%${q}%`,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                l_name: {
                                    contains: `%${q}%`,
                                    mode: 'insensitive'
                                }
                            }
                        ],
                    }
                },
                include: {
                    profile: true
                },  
            })  
        ])
        return [count, members];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view user")
    }
}

export const getSingleMember = async (id) => {
    try {
        const member = await prisma.$transaction([
            prisma.Member.findUnique({
                include: {
                    profile: true
                },
                where: {
                    id: id
                },
            })  
        ])
        return member[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find member")
    }
}

export const getMemberCount = async () => {
    try {
        const member = await prisma.$transaction([
            prisma.Member.count()
        ])
        return member[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find member")
    }
}

export const getUnpaidCount = async () => {
    try {
        const member = await prisma.$transaction([
            prisma.MemberProfile.count({
                where: {
                    due_status: false
                }
            })
        ])
        return member[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find member")
    }
}

export const getAllEvent = async (q, page) => {
    const ITEMS_PER_PAGE = 2
    try {
        const [count, events] = await prisma.$transaction([
            prisma.Event.count(),
            prisma.Event.findMany({
                orderBy: {
                    date: 'asc'
                },
                skip: (ITEMS_PER_PAGE * (page-1)),
                take: ITEMS_PER_PAGE,
                where: {
                    title: {
                        contains: `%${q}%`,
                        mode: 'insensitive'
                    }
                }
            })
        ])
        return [count, events];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view event")
    }
}

export const getEvents = async () => {
    try {
        const events = await prisma.$transaction([
            prisma.Event.findMany({
                orderBy: {
                    date: 'asc'
                },
            })
        ])
        return events[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch events")
    }
}

export const getSingleEvent = async (id) => {
    try {
        const event = await prisma.$transaction([
            prisma.Event.findUnique({
                where: {
                    id: id
                },
            })  
        ])
        return event[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find event")
    }
}

export const getAllMerch = async (q, page) => {
    const ITEMS_PER_PAGE = 2
    try {
        const [count, merchs] = await prisma.$transaction([
            prisma.Merch.count(),
            prisma.Merch.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                skip: (ITEMS_PER_PAGE * (page-1)),
                take: ITEMS_PER_PAGE,
                where: {
                    title: {
                        contains: `%${q}%`,
                        mode: 'insensitive'
                    }
                }
            })
        ])
        return [count, merchs];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view merch")
    }
}

export const getMerch = async () => {
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
        return merchs[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch merch")
    }
}

export const getSingleMerch = async (id) => {
    try {
        const merch = await prisma.$transaction([
            prisma.Merch.findUnique({
                where: {
                    id: id
                },
            })  
        ])
        return merch[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find merch")
    }
}

export const checkDuesAndShirtPaid = async (id) => {
    try {
        const check = await prisma.$transaction([
            prisma.Member.findUnique({
                where: {
                    id: id
                },
                select: {
                    profile: {
                        select: {
                            due_status: true,
                            shirt_status: true
                        }
                    }
                }
            })  
        ])
        return check[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find merch")
    }
}

export const checkProductType = async (id) => {
    try {
        const check = await prisma.$transaction([
            prisma.Merch.findUnique({
                where: {
                    id: id
                },
                select: {
                    type: true
                }
            })  
        ])
        return check[0].type;
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find merch")
    }
}

export const getPreviewTrans = async () => {
    try {
        const trans = await prisma.$transaction([
            prisma.Transactions.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10,
            })
        ])
        return trans[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to fetch transactions preview")
    }
}

export const getAllTrans = async (q, page) => {
    const ITEMS_PER_PAGE = 2
    try {
        const [count, trans] = await prisma.$transaction([
            prisma.Transactions.count(),
            prisma.Transactions.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                skip: (ITEMS_PER_PAGE * (page-1)),
                take: ITEMS_PER_PAGE,
                where: {
                    OR: [
                        {
                            member_name: {
                                contains: `%${q}%`,
                                mode: 'insensitive'
                            }
                        },
                        {
                            merch_title: {
                                contains: `%${q}%`,
                                mode: 'insensitive'
                            }
                        }
                    ],
                },
            })
        ])
        return [count, trans];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to view transactions")
    }
}