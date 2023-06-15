import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function QuestionCard(props) {
    return (
        <>
            <Card sx={{width: '80%'}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Câu hỏi số :{props.id}
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Dạng câu hỏi :{props.type.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {props.content}
                    </Typography>
                    {props.answers.map((item) => (
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {item.content}
                        </Typography>
                    ))}
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    );
}