const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const { check, validationResult } = require('express-validator/check');
const ObjectId = mongoose.Types.ObjectId;

// tüm driverlar için son kayıt olma tarihlerine göre sayfalayarak döndürür
// sayfa başına 5 driver döner
router.get('/', asyncHandler(async function(req, res, next) {

  try {

    const page = req.query.page || 1;

    const drivers = await Driver
                          .find()
                          .sort({
                            updated_at: -1,
                          })
                          .skip((parseInt(page) - 1) * 8)
                          .limit(8);

    res.json({
      success: true,
      payload: drivers
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

}));

// driver id bilgisi ile driver bilgilerini gönderir
router.get('/driver/:id', asyncHandler(async function(req, res, next) {

  try {

    const driver = await Driver.findById(req.params.id)

    res.json({
      success: true,
      payload: driver
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

}));

// driver id bilgisi ile driver siler
router.delete('/driver/:id', asyncHandler(async function(req, res, next) {

  try {

    await Driver.remove({ _id: req.params.id })

    res.json({
      success: true,
      payload: null
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

}));

// driver id bilgisi ile driver bilgileri üzerinde güncelleme yapar
router.put('/driver/:id', asyncHandler(async function(req, res, next) {

  try {

    req.body.updated_at = new Date()

    const driver = await Driver.findOneAndUpdate(
     {
       _id: req.params.id,
     },
     req.body,
     {
       new: true
     }
   );

    res.json({
      success: true,
      payload: driver
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

}));

// gönderilen bilgiler doğrultusunda driver oluşturur
router.post('/driver', [
  check('name')
    .exists().withMessage('name field blank')
    .trim(),
  check('surname')
    .exists().withMessage('surname field blank')
    .trim(),
  check('latitude')
    .isFloat().withMessage('latitude field blank')
    .trim(),
  check('longitude')
    .isFloat().withMessage('longitude field blank')
    .trim()
], asyncHandler(async function(req, res, next) {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.mapped()
      });
    }

    const driver = await Driver({
      name: req.body.name,
      surname: req.body.surname,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.latitude)
          ,
          parseFloat(req.body.longitude)
        ]
      }
    }).save();

    res.json({
      success: true,
      payload: driver
    });

  } catch (error) {

    res
    .status(500)
    .json({
      success: false,
      payload: null,
      error
    });

  }

}));

module.exports = router;
