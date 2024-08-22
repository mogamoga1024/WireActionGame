
Sub ColorToObjectId()

    Dim ws As Worksheet
    Set ws = ActiveSheet
    
    Dim blockColor As Long
    Dim trampolineColor As Long
    Dim deathColor As Long
    blockColor = ws.Range("B2").Interior.Color
    trampolineColor = ws.Range("B3").Interior.Color
    deathColor = ws.Range("B4").Interior.Color
    
    Dim blockId As Long
    Dim trampolineId As Long
    Dim deathId As Long
    blockId = 1
    trampolineId = 2
    deathId = 3
    
    ' 選択した範囲を取得
    Dim selectedRange As Range
    Set selectedRange = Selection
    
    Dim cell As Range
    Dim output As String
    Dim cellColor As Long
    Dim cellId As Long
    Dim currentRow As Long
    Dim previousRow As Long
    
    previousRow = selectedRange.Cells(1, 1).Row
    
    ' 選択範囲内の各セルをチェック
    For Each cell In selectedRange
        cellColor = cell.Interior.Color
        currentRow = cell.Row
        
        ' セルの色に対応するIDを決定
        If cellColor = blockColor Then
            cellId = blockId
        ElseIf cellColor = trampolineColor Then
            cellId = trampolineId
        ElseIf cellColor = deathColor Then
            cellId = deathId
        Else
            cellId = 0 ' 未知の色の場合はID 0とする
        End If
        
        ' 行が変わったら改行を追加
        If currentRow <> previousRow Then
            output = output & vbCrLf & cellId
        Else
            If output = "" Or Right(output, 2) = vbCrLf Then
                output = output & cellId
            Else
                output = output & "," & cellId
            End If
        End If
        
        previousRow = currentRow
    Next cell
    
    ' イミディエイトウィンドウに出力
    Debug.Print output

End Sub
