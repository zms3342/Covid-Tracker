import React from 'react';
import "../css/InfoBox.css";
import {Card,CardContent,Typography} from "@material-ui/core";


function InfoBox({title, cases, total}) {
    return (
        <div className="infoBox">
            <Card>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        {title}
                    </Typography>

                    <h2 className="infoBox__cases">{cases}</h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total
                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
