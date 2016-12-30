$(document).ready(function() {
    $('#scoreBtn').on('click', function() {
        var voteId = $('#temp').attr('vid');
        var competitorId = $('#temp').attr('cid');
        var score = $('#scoreIpt').val();

        var phone = $('#phoneIpt').val();

        if(!phone || !(/^1\d{10}$/.test(phone)) ) {
            alert('请填写正确的电话号码');
            return;
        }

        if(!score || !/^\d+(\.\d+)?$/.test(score)) {
            alert('请填写正确的分数');
            return;
        }

        var url = '/wap/votes/addScore/' + voteId + '/' + competitorId + '/' + score + '/' + phone;

        $.post(url, null, function(result) {
            alert(result.msg);
            if(result.success) {
                location.href = '/wap/votes/vote/' + voteId + '/competitor/' + competitorId;
            }else {
                location.href = '/wap/votes/vote/' + voteId;
            }
        }, 'json');
    });

    $('#zanchengBtn').on('click', function() {
        var voteId = $('#temp').attr('vid');
        var competitorId = $('#temp').attr('cid');

        var phone = $('#phoneIpt').val();

        if(!phone || !/^1\d{10}$/.test(phone)) {
            alert('请填写正确的电话号码');
            return;
        }

        var url = '/wap/votes/addIn/' + voteId + '/' + competitorId + '/' + phone;

        $.post(url, null, function(result) {
            alert(result.msg);
            if(result.success) {
                location.href = '/wap/votes/vote/' + voteId + '/competitor/' + competitorId;
            }else {
                location.href = '/wap/votes/vote/' + voteId;
            }
        }, 'json');
    });

    $('#fanduiBtn').on('click', function() {
        var voteId = $('#temp').attr('vid');
        var competitorId = $('#temp').attr('cid');

        var phone = $('#phoneIpt').val();

        if(!phone || !/^1\d{10}$/.test(phone)) {
            alert('请填写正确的电话号码');
            return;
        }

        var url = '/wap/votes/addOut/' + voteId + '/' + competitorId + '/' + phone;

        $.post(url, null, function(result) {
            alert(result.msg);
            if(result.success) {
                location.href = '/wap/votes/vote/' + voteId + '/competitor/' + competitorId;
            }else {
                location.href = '/wap/votes/vote/' + voteId;
            }
        }, 'json');
    });

    $('#voteBtn').on('click', function() {
        var voteId = $('#temp').attr('vid');
        var competitorId = $('#temp').attr('cid');

        var phone = $('#phoneIpt').val();

        if(!phone || !/^1\d{10}$/.test(phone)) {
            alert('请填写正确的电话号码');
            return;
        }

        var url = '/wap/votes/addVote/' + voteId + '/' + competitorId + '/' + phone;

        $.post(url, null, function(result) {
            alert(result.msg);
            if(result.success) {
                location.href = '/wap/votes/vote/' + voteId + '/competitor/' + competitorId;
            }else {
                location.href = '/wap/votes/vote/' + voteId;
            }
        }, 'json');
    });

});