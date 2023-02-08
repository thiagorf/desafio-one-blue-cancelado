import prisma from "../../../prisma";

async function likeThought(thought_id: number, user_id: number) {
    const [like, _] = await prisma.$transaction([
        prisma.likes.create({
            data: {
                thought_id,
                user_id,
            },
        }),
        prisma.thoughts.update({
            where: {
                id: thought_id,
            },
            data: {
                likes_qty: {
                    increment: 1,
                },
            },
        }),
    ]);

    return like;
}

async function removeLikeThought(thought_id: number, user_id: number) {
    return await prisma.$transaction(async (tx) => {
        const targetThoughtLike = await tx.likes.findFirst({
            where: {
                thought_id,
                user_id,
            },
        });

        const removedLike = await tx.likes.delete({
            where: {
                id: targetThoughtLike!.id,
            },
        });

        await tx.thoughts.update({
            where: {
                id: thought_id,
            },
            data: {
                likes_qty: {
                    decrement: 1,
                },
            },
        });

        return removedLike;
    });
}

export { likeThought, removeLikeThought };
