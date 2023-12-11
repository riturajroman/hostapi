const user = require('../models/model');

const getAllData = async (req, res) => {
    try {
        let selectFields = req.query.select; // Assuming the URL parameter is named 'select'

        let query = user.find();

        // Check if the 'select' parameter is provided in the URL
        if (selectFields) {
            // Split the fields and add them to the select query
            const fieldsArray = selectFields.split(',');
            query = query.select(fieldsArray.join(' '));
        }

        const allData = await query.exec();

        if (allData.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No data found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: allData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error'
        });
    }
};

const getData = async (req, res) => {
    try {
        const singleData = await user.findById(req.params.id);

        // Check if no document was found
        if (!singleData) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: singleData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
const updateData = async (req, res) => {
    try {
        const update = await user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Check if no document was found
        if (!update) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: update
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const deleteData = async (req, res) => {
    try {
        const deleteUser = await user.findByIdAndDelete(req.params.id);

        // Check if no document was found
        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: 'No data found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: deleteUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error'
        });
    }
};

module.exports = { getAllData, getData, updateData, deleteData };