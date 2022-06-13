class APIFeatures {
    constructor (query, queryString) {
        this.query = query;
        this.queryString = queryString; 
    }

    filter(){
        const queryObjs = {...this.queryString}
        const excludedFields= ["page", "sort", "limit", "fields"]
        excludedFields.forEach(el => delete queryObjs[el])
        //1B) advanced filtering
        let queryStr = JSON.stringify(queryObjs)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
       
        this.query = this.query.find(JSON.parse(queryStr));
        console.log(this, "filter method")
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query = this.query.sort(sortBy)
            //sort ("price ratingsAverage")
            
        }else{
            this.query = this.query.sort("-createdAt")

        }
        console.log(this, "sort method")
        return this;
    }
    selectionFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(" ");
            this.query= this.query.select(fields)
        }else{
            this.query = this.query.select("-__v")
        }
        console.log(this, "selection method")
        return this;
    }
    paginate(){
        const page = this.queryString.page *1 || 1;
        const limit = this.queryString.limit *1 || 100;
        const skip = (page-1) * limit
        this.query = this.query.skip(skip).limit(limit)
        console.log(this, "paginate method")
        return this;
    }
}

module.exports = APIFeatures