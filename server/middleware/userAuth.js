import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {  
    
        // Extract token from cookies
        const { token } = req.cookies;

        // If no token, return unauthorized response
        if (!token) {
            return res.json({success: false,message:'Not Authorized. Login Again',
            });
        }

        try{

        // Verify JWT token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;  
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized. Login Again',
            });
        }

        
        next();  // Proceed to the next middleware

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token: ' + error.message,  
        });
    }
};

export default userAuth;
