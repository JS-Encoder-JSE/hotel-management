export const getCheckoutReport = async (req, res) => {
    const { to, from } = req.query;

    try {
        // const report = await Model.find({
        //     checkoutDate: {
        //         $gte: new Date(from), // Greater than or equal to 'from' date
        //         $lte: new Date(to)    // Less than or equal to 'to' date
        //     }
        // });

        // res.status(200).json({data:report,status:true,message:"Report retreived successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};