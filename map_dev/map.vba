Sub ColorToObjectId()

    Dim ws As Worksheet
    Set ws = ActiveSheet
    
    Dim playerColor As Long
    Dim blockColor As Long
    Dim trampolineColor As Long
    Dim deathColor As Long
    Dim unstickableColor As Long
    Dim respawnRColor As Long
    Dim respawnLColor As Long
    Dim goalColor As Long
    playerColor = ws.Range("B2").Interior.Color
    blockColor = ws.Range("B3").Interior.Color
    trampolineColor = ws.Range("B4").Interior.Color
    deathColor = ws.Range("B5").Interior.Color
    unstickableColor = ws.Range("B6").Interior.Color
    respawnRColor = ws.Range("B7").Interior.Color
    respawnLColor = ws.Range("B8").Interior.Color
    goalColor = ws.Range("B9").Interior.Color
    
    Dim playerId As Long
    Dim blockId As Long
    Dim trampolineId As Long
    Dim deathId As Long
    Dim unstickableId As Long
    Dim respawnRId As Long
    Dim respawnLId As Long
    Dim goalId As Long
    playerId = 1
    blockId = 2
    trampolineId = 3
    deathId = 4
    unstickableId = 5
    respawnRId = 6
    respawnLId = 7
    goalId = 8
    
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
        If cellColor = playerColor Then
            cellId = playerId
        ElseIf cellColor = blockColor Then
            cellId = blockId
        ElseIf cellColor = trampolineColor Then
            cellId = trampolineId
        ElseIf cellColor = deathColor Then
            cellId = deathId
        ElseIf cellColor = unstickableColor Then
            cellId = unstickableId
        ElseIf cellColor = respawnRColor Then
            cellId = respawnRId
        ElseIf cellColor = respawnLColor Then
            cellId = respawnLId
        ElseIf cellColor = goalColor Then
            cellId = goalId
        Else
            cellId = 0 ' 未知の色の場合はID 0とする
        End If
        
        If currentRow <> previousRow Then
            output = output & "],["
        Else
            If output = "" Then
                output = "const map = [["
            Else
                output = output & ","
            End If
        End If
        
        output = output & cellId
        previousRow = currentRow
    Next cell
    
    output = output & "]];"
    
    ' クリップボードに出力
    Dim dataObj As New MSForms.DataObject
    dataObj.SetText output
    dataObj.PutInClipboard

End Sub

