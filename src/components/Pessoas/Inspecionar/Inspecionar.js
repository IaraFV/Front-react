import { Link } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import './inspecionar.css'

function Inspecionar () {
return(
<>
        <div>
            <IconButton sx={{color: 'white'}}>
                <Link to="/Pessoas" />
                <ArrowBackIcon/>
            </IconButton>

            <main>
                <div className="card-inspecionar">
                    
                </div>
            </main>

        </div>
</>
    )
}


export default Inspecionar;