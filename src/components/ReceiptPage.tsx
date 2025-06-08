import React from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Divider, Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const ReceiptPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container component={Paper} sx={{ p: 4, my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          領収書
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ 
              mb: 2,
              '@media print': {
                display: 'none'
              }
            }}
          >
            印刷
          </Button>
          <Typography variant="h6">株式会社サンプル</Typography>
          <Typography>〒123-4567 東京都渋谷区...</Typography>
          <Typography>TEL: 03-1234-5678</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">宛名:</Typography>
        <Typography>クライアント株式会社 御中</Typography>
      </Box>

      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3">¥605,000-</Typography>
        <Typography variant="body1">（内消費税等 ¥55,000）</Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography>但し、Webサイト制作及び保守・運用料として</Typography>
        <Typography>上記正に領収いたしました。</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography>発行日: {new Date().toLocaleDateString('ja-JP')}</Typography>
      </Box>
    </Container>
  );
};

export default ReceiptPage; 