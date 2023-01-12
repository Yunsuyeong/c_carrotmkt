import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const reservations = await client.reservation.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              reservations: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    reservations,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
