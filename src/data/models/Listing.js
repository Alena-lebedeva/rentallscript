import DataType from 'sequelize';
import Model from '../sequelize';
import bcrypt from 'bcrypt';

const Listing = Model.define('Listing', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: DataType.UUID,
    allowNull: false
  },

  title: {
    type: DataType.STRING,
  },

  description: {
    type: DataType.TEXT,
  },

  residenceType: {
    type: DataType.STRING,
  },

  bedrooms: {
    type: DataType.STRING,
  },

  beds: {
    type: DataType.INTEGER,
  },

  personCapacity: {
    type: DataType.INTEGER,
  },

  bathrooms: {
    type: DataType.FLOAT,
  },

  country: {
    type: DataType.STRING,
  },

  street: {
    type: DataType.STRING,
  },

  buildingName: {
    type: DataType.STRING,
  },

  city: {
    type: DataType.STRING,
  },

  state: {
    type: DataType.STRING,
  },

  zipcode: {
    type: DataType.STRING,
  },

  lat: {
    type: DataType.FLOAT,
  },

  lng: {
    type: DataType.FLOAT,
  },

  coverPhoto: {
    type: DataType.INTEGER,
  },

  isMapTouched: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  bookingType: {
    type: DataType.ENUM('request', 'instant'),
    defaultValue: 'instant',
    allowNull: false
  },

  isPublished: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  isReady: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  reviewsCount: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  }

});

export default Listing;
