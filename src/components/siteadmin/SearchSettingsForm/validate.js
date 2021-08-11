const validate = values => {

    const errors = {}

    if (!values.minPrice) {
        errors.minPrice = 'Minimum Price is required';
    }

    if(isNaN(values.minPrice) || (parseInt(values.minPrice, 10) < 0)){
	    errors.minPrice = 'Only numeric values are allowed';
	}

  	if(isNaN(values.maxPrice) || (parseInt(values.maxPrice, 10) < 0)){
    	errors.maxPrice = 'Only numeric values are allowed';
  	}

    if (!values.maxPrice) {
        errors.maxPrice = 'Maximum Price is required';
    }

    return errors
}

export default validate;