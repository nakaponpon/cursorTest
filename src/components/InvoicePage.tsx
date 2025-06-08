import React from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Divider, Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const InvoicePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container component={Paper} sx={{ p: 4, my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          請求書
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
        <Typography variant="h6">請求先:</Typography>
        <Typography>クライアント株式会社 御中</Typography>
      </Box>

      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>品目</TableCell>
            <TableCell align="right">数量</TableCell>
            <TableCell align="right">単価</TableCell>
            <TableCell align="right">金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Webサイト制作</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">¥500,000</TableCell>
            <TableCell align="right">¥500,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>保守・運用</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">¥50,000</TableCell>
            <TableCell align="right">¥50,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6">小計: ¥550,000</Typography>
        <Typography variant="h6">消費税 (10%): ¥55,000</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>合計金額: ¥605,000</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle1">お振込先:</Typography>
        <Typography>サンプル銀行 サンプル支店 (普通) 1234567</Typography>
        <Typography>カ）サンプル</Typography>
      </Box>
    </Container>
  );
};

export default InvoicePage; 